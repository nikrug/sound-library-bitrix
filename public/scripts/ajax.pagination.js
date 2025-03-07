$(function () {
    function onPaginationButtonClick(event) {
        event.preventDefault()
        if (event.target.tagName.toLowerCase() === 'a') {
            event.currentTarget.classList.add('_loading')
            $.ajax({
                url: event.target.href,
                method: 'post',
                data: {
                    key: this.dataset.key
                },
                success: function (response) {
                    // изменение url
                    var url = new URL(window.location.origin + event.target.href)
                    window.history.pushState({}, null, url.search)


                    var resultBlock = $(event.currentTarget.dataset.result)
                    var parsedResponse = JSON.parse(response)
                    var result = parsedResponse.result
                    var pagination = parsedResponse.pagination
                    if (result && pagination) {
                        resultBlock.html(result)
                        $(event.currentTarget).html(pagination)
                        resultBlock[0].scrollIntoView({block: 'start'})
                    }
                }
            }).always(function () {
                event.currentTarget.classList.remove('_loading')
            })
        }
    }

    function bindPaginationAjaxForm() {
        var paginationButtons = $('.j-pagination')
        paginationButtons.on('click', onPaginationButtonClick)
    }

    bindPaginationAjaxForm()
})