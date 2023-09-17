The thing is... this still connect to MongoDB atlas, not MongoDB in local
i just can't make it work at the moment
so i'm gonna stick with only one project for the time being ig

Main feature:
    CRUD custom menu (if logged in)
    choose job to do
    update bill with total job and price(time)
    checkout to start timecounter(sẽ xem xét cho từng job)
    random to randomize job within freetime (require fill freetime first)

Luồng:
    Guess:  select, start sample job menu
            register
    User:   Login
            CRUD User menu
            use their own menu

trying this structure:
\_ /.next/
  \_ /components/
      \_ Component/
  \_ /constants/
      \_ theme.js
      \_ page.js
  \_ /contexts/
      \_ Locale/
         \_ index.js
      \_ Page/
         \_ index.js
  \_ /pages/
      \_ _app.jsx
      \_ _document.jsx
      \_ about.jsx
      \_ index.jsx
        \_ subPages/
            \_ index.js    
            \_ somepage.js    
  \_ /providers/
      \_ Locale/
         \_ index.js
      \_ Page/
         \_ index.js
  \_ /public/
      \_ favicon.ico
      \_ header.png
  \_ /redux/
      \_ actions/
         \_ users/
            \_ index.js
         \_ products/
            \_ index.js
      \_ reducers/
         \_ users/
            \_ index.js
         \_ products/
            \_ index.js
      \_ store/
         \_ index.js
      \_ types/
         \_ index.js
  \_ /shared/
      \_ jsons/
          \_ users.json
      \_ libs/
          \_ locale.js
      \_ styles/
          \_ global.css
  \_ /widgets/
      \_ PageHeader/
          \_ index.jsx
  \
  \_ .eslintignore
  \_ .eslintrc
  \_ .env
  \_ babel.config.js
  \_ Dockerfile
  \_ jest.config.js
  \_ next.config.js
  \_ package.json
  \_ README.md