Free Music Ninja API
====================

Requirements
------------

This project requires `Python 3`_ and `PostgreSQL`_:

.. code-block:: bash

    $ sudo apt-get install python3-dev libpq-dev postgresql postgresql-contrib


Installation
------------

Install Python dependencies (in a virtualenv preferably):

.. code-block:: bash

    $ pip install -r requirements.txt


Environment Variables
---------------------

This project uses environment variables for configuration.

1. ``ECHONEST_API_KEY``: Credentials for `The Echo Nest API`_
2. ``JAMENDO_CLIENT_ID``: Credentials for `Jamendo API`_
3. ``FMA_API_KEY``: Credentials for `FreeMusicArchive API`_
4. ``SECRET_KEY``: `Secret key`_ for cryptographic signing
5. ``DATABASE_URL``: URL for database connection (see `database URL schema`_)



Running the Server
------------------

To start the Django server:

.. code-block:: bash

    $ ./manage.py runserver

Now visit http://localhost:3200/ in your browser.


.. _database url schema: https://github.com/kennethreitz/dj-database-url#url-schema
.. _freemusicarchive api: http://freemusicarchive.org/api/
.. _jamendo api: https://developer.jamendo.com/
.. _postgresql: https://www.python.org/downloads/
.. _python 3: https://www.python.org/downloads/
.. _secret key: https://docs.djangoproject.com/en/1.7/ref/settings/#std:setting-SECRET_KEY
.. _the echo nest api: https://developer.echonest.com/
