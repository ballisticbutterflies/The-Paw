# The Paw

Heard about that new bakery? Or what about that the brewery down the street? If you are hoping to bring your furry friends along, The Paw is here to help. This web application hosted at [the-paw.onrender.com](the-paw.onrender.com), allows business owners to add their business and let pet owners all over know that their business is happy to accomodate your playful pup or friendly feline. Pet owners are able to review these businesses as well to ensure that others are kept up to date on what to expect.


Designed and Developed by [Carmen Shiu](https://github.com/craftycarmen), [Tracey Beard](https://github.com/traceybee23), and [Simon Sammel](https://github.com/bssammel).

# Index

[Application Stack](#application-stack) | [Install Instructions](#local-install-instructions) | [Implementation Notes](#implementation-notes) | [Future Implementations](#future-implementations) | [Database Schema Design](#database-schema-design) | [API Documentation](#api-documentation) | [Wireframe](#wireframe)

## Application Stack

<div style="display:flex;justify-content:center;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1024px-HTML5_logo_and_wordmark.svg.png" alt="html 5 icon"  height="100" /> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/363px-CSS3_logo_and_wordmark.svg.png" alt="css 3 icon"  height="100" /> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png" alt="javascript icon"  height="100" /> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/121px-Python-logo-notext.svg.png" alt="python icon"  height="100" /><img src="https://flask.palletsprojects.com/en/3.0.x/_images/flask-horizontal.png" alt="flask icon"  height="100" style="width:100px;object-fit:cover;object-position:left;"  /> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1985px-Postgresql_elephant.svg.png" alt="postgresql icon"  height="100" /><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="react icon"  height="100" /><img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png" alt="redux icon"  height="100" /></div>


Before diving into tackling individual features, we worked as a team to establish the database through the SQLAlchemy ORM. The backend API was built using the Flask framework to allow us to write in Python and make the most of its object-oriented programming (OOP) capabilities.

The front end of this application was made using React/Redux with HTML, CSS, and JS. The Google Fonts API was also used to style text, and we are researching implementation for Google Maps API. The logo for the site was made in Canva.

## Local Install Instructions

If you wish to run this application locally, here are the install notes.

1. First you will need to clone this repository. <br> `git clone https://github.com/ballisticbutterflies/The-Paw.git`
2. Next you will need to install dependencies at the root. <br> `pipenv install -r requirements.txt`
3. You will also want to copy .env.example as a .env file, but with your key values from within the env directory. `cd  env` then `cp .env.example .env`. Ensure that your schema name is in snake case.
4. If you already have the openssl library installed, you can run `openssl rand -base64 10` to generate a secret key. 
5. Back at the root directory, get into your pipenv, migrate your database, and seed your database, and run your Flask app, run the following commands:
   - These must be run in order: <br> `pipenv shell` <br> `flask db upgrade`<br> `flask seed all` <br> `flask run`
6. Open a new terminal and navigate to the frontend directory so that the backend is live and install dependencies in the front end terminal.<br> `npm i`
7. In this frontend directory, then start the React frontend server.<br> `npm run dev`
8. In a new frontend directory, run `npm run build` which will trigger vite to build. The original command for this is `vite build --watch`. The `--watch` flag will trigger a rebuild when changes are made to vite.config.js as well as any bundled files. This is found at line 8 in `frontend/package.json`. <br> `npm run build`
9. If Vite does not automatically open a tab in your browser, navigate to `http://localhost:5173/`.
10. You are all set to run The Paw on your local machine!

## Database Schema Design

If you would like to view our database schema design, you can do so [here](https://github.com/ballisticbutterflies/The-Paw/wiki/Database-Schema)

## API Documentation

In order to view our API route documentation, navigate [here]()

## Wireframe

We are proud of the front end design work that allowed us to build a site according to our wireframe. To view that wireframe, click [here](https://www.canva.com/design/DAF-sAfmzW0/19OFQL2f7szQz104swZt0w/view)
