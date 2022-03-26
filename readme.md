# coub_downloader

Надеюсь, ошибок не будет

### Требования для успешного запуска:

- Windows 10
- Node 14.17.6
- yarn 1.22.18
- npm 6.14.15

### Инструкция

Необходимо авторизоваться на сайте [coub.com](https://coub.com) и сохранить токены в блокнот:

- \_coub_session_2
- remember_token

Далее установите пакеты через команду `yarn` в корневой папке.
После установки запустите проект через команду `yarn preview`.

Если пользуетесь другим менеджером пакетов, то в "package.json" необходимо заменить yarn на используемый package manager.

В интерфейсе приложения подставьте токены в соответствующие поля.

Затем нажмите на кнопку "Fetch", а после сообщения об успешном сохранении идентификаторов необходимо нажать на "Download".
После этого запустится браузер, который сохранит Coub'ы в папку "Загрузки".
