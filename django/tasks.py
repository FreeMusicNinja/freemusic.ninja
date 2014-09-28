import os

from invoke import run, task


@task
def test(speed='fast'):
    if speed == 'fast':
        os.environ['DATABASE_URL'] = "sqlite://"
    run("coverage run manage.py test")
    run("coverage html")
