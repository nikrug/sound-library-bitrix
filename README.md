# Webpack Base Template

Template for assembling statics:

* TypeScript
* SCSS
* PUG
* Eslint(Standard)
* Stylelint(Standard)

---
## Старт работ

#### Install the dependencies
```bash
npm install
```

#### Start in the development mode
```bash
npm run dev
```

#### Build for production
```bash
npm run build
```

#### Гайд по настройке линтера в VSCode
 - Скачать рлагин [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
 - Зажать "Ctrl" + "Shift" + "p"
 - Выбрать "Preferences: Open Settings(JSON)"
 - Добавить 
    <pre>
   {
      "scss.validate": false,
      "css.validate": false,
      "less.validate": false,
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
        "source.fixAll.stylelint": true
      },
     "stylelint.configFile": "D:/projects/PATH_TO_PROJECT/.stylelintrc.json"
   }
    </pre>
  - Вы восхитительны!(при сохранении кода в редакторе линтер пофиксит возможные issue)

---

## Описание структуры

* В папке src/pages лежат папки под каждую страницу на сайте 
* Внутрпи каждой страницы может располагаться папка modules, содержащая секции данной страницы
* В папке src/modules хранятся универсальные секции, которые можно переисопльзовать на разных страницах или в лэйауте
* В папке src/components хранятся универсальные компоненты - например, кнопки, поля ввода, элементы формы и пр.
* В папке src/assets/fonts лежат сами шрифты, а подключаются они в файле src/styles/fonts.scss
* В папке src/assets/images лежат картинки - их рекомендуется разбивать по подпапкам и давать им логичные имена
* Для вынесения перечислимых значений из резметки используйте файл constants.pug (есть пример в src/pages/about/modules/itemList/constants.pug)
* Перед началом работ рекомндуется ознакомиться с имеющимся функционалом для более удобной работы

---

## Краткий Code Guide

#### Базовые правила для верстки
* При верстке блоков используется БЭМ
* Не используются инлайновые стили
* Используются переменные из файла `variables.scss` для повторяющихся значений
* Названия классов пишутся в kebab-case, например `.main-screen`
* Модификатор для класса обозначается добавлением двойного тире: `--`
* Для правила border-width если значение не слишком большое рекомендуется использовать px

#### Базовые правила для js
* Функционал вешается на классы, начинающиеся с приставки `j-`, например, класс `.j-form`
* При этом классу `.j-form` нельзя задавать css-стили - он нужен только для функциональной части
* При написании логики для блоков не забывайте ставить проверки на существование блоков, на которых вешается функционал
* Рекомендуется заранее предусматривать удобство переиспользования уже написанного функционала

---

## Полезные ссылки
* [Руководство по качеству кода](https://gitlab.redramka.ru/missingsince1983/meetup-info/tree/main/1.%20codestyle-frontend/BASE)
* [Правила работы с GIT](https://gitlab.redramka.ru/missingsince1983/meetup-info/tree/main/1.%20codestyle-frontend/GIT)
* [Стандарты в JS](https://gitlab.redramka.ru/missingsince1983/meetup-info/tree/main/1.%20codestyle-frontend/JS)
