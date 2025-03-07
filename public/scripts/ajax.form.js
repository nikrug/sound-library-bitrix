$(function () {
    // Локализация сообщений об ошибках для плагина jQuery Validate
    $.validator.messages = {
        required: 'Обязательное поле',
        remote: 'Пожалуйста, исправьте это поле.',
        email: 'Пожалуйста, введите действительный адрес электронной почты.',
        url: 'Пожалуйста, введите корректный адрес.',
        equalTo: 'Пожалуйста, введите то же значение еще раз.',
        date: 'Пожалуйста, введите правильную дату.',
        minlength: $.validator.format('Введите не менее {0} символов.')
        // dateISO: 'Пожалуйста, введите действительную дату (ISO).',
        // number: 'Пожалуйста введите правильное число.',
        // digits: 'Пожалуйста, вводите только цифры.',
        // rangelength: $.validator.format('Введите значение длиной от {0} до {1} символов.'),
        // range: $.validator.format('Введите значение от {0} до {1}.'),
        // max: $.validator.format('Введите значение меньше или равное {0}.'),
        // min: $.validator.format('Введите значение, большее или равное {0}.'),
        // step: $.validator.format('Введите число, кратное {0}.')
    }

    function showFieldError(formId, name, message) {
        $('.j-err_' + formId + '_' + name).addClass('_error')
        $('.j-err_' + formId + '_' + name + '_TEXT').html(message)
    }

    function hideFieldError(formId, name) {
        $('.j-err_' + formId + '_' + name).removeClass('_error')
        $('.j-err_' + formId + '_' + name + '_TEXT').html('')
    }

    function showErrorMessage(form, message) {
        $(form).addClass('_error')
        if (message) {
            $node = $('.j-error_' + $(form).attr('id'));
            $node.addClass('_show')
            $node.html(message)
        }
    }

    function hideErrorMessage(form) {
        $(form).removeClass('_error')
        $('.j-error_' + $(form).attr('id')).removeClass('_show');
    }

    function bindAjaxForm() {
        var forms = $('form.j-ajaxForm')
        forms.each(function () {
            var $form = this
            var validator = $(this).validate({
                unhighlight: function (element) {
                    var name = element.name
                    var id = $(this)[0]?.errorContext.attr('id')
                    hideFieldError(id, name)
                },
                errorPlacement: function (error, element) {
                    var name = element.attr('name')
                    var id = $(this)[0]?.errorContext.attr('id')
                    showFieldError(id, name, error.html())
                    return true
                }
            })

            var options = {
                dataType: 'json',
                success: onSuccess, // post-submit callback
                error: function () {
                    showErrorMessage($form, 'При запросе' + $form.action + 'произошла ошибка')
                },
                beforeSubmit: function (arr, _, options) {
                    hideErrorMessage($form)
                    var canSubmit = validator.form()
                    if (canSubmit) {
                        $form.dispatchEvent(new CustomEvent('loading', {detail: true}))
                        $form.classList.add('_loading')
                    }
                    return canSubmit
                },
                complete: function () {
                    $form.dispatchEvent(new CustomEvent('loading', {detail: false}))
                    $form.classList.remove('_loading')
                }
            }

            function onResetValidate() {
                validator.resetForm()
            }

            $(this).on('reset', onResetValidate)
            $(this).ajaxForm(options)
        })
    }


    function onSuccess(response, statusText, xhr, form) {
        var $form = form[0]

        form.find('._error').removeClass('_error')

        if (typeof BX !== 'undefined') BX.closeWait()

        if (statusText !== 'success') return;

        if (response.submitOn && $form) {

            if (response.redirectUrl) {
                if (typeof response.openerOn !== 'undefined' && response.openerOn) {
                    window.opener.location = response.redirectUrl
                    window.opener.location.reload()
                    window.close()
                } else {
                    window.location = response.redirectUrl
                }
            } else if (response.reloadOn) {
                window.location.reload()
            } else {
                $form.dispatchEvent(new Event('success'))
                document.querySelector('.j-' + $(form).attr('id') + '_success').dispatchEvent(new Event('open'))

                if (response.callFunc) {
                    try {
                        eval(response.callFunc + '(response, form);')
                    } catch (e) {

                    }
                }

            }
            $form.reset()
        }

        if (typeof response.captcha_sid !== 'undefined') {
            $('#' + $(form).attr('id') + ' .j-captcha-img').each(function (i, el) {
                $(el).attr('src', response.captcha_url)
            })
            $('#' + $(form).attr('id') + ' fieldText[name="captcha_sid"]').val(response.captcha_sid)
        }

        if (typeof response.sessid !== 'undefined') {
            $('#' + $(form).attr('id') + ' fieldText[name="sessid"]').val(response.sessid)
        }

        if (response.errors) {
            if (typeof grecaptcha !== 'undefined' && $('#' + $(form).attr('id') + '_gRecaptcha').length > 0) {
                if (window.grecaptcha) grecaptcha.reset()
            }

            showErrorMessage(form, 'Проверьте правильность заполнения формы')
            for (var ctrlErr in response.errors) {
                if ($(form).hasClass('j-alerts')) {
                    $.event.trigger({type: 'flashMessage', txt: response.errors[ctrlErr], variant: 'error'})
                }
                showFieldError(form.attr('id'), ctrlErr, response.errors[ctrlErr])
                if (ctrlErr === 'captcha') showErrorMessage(form[0], response.errors[ctrlErr])
            }
        }

    }

    bindAjaxForm()
})
