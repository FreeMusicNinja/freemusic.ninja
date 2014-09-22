from fabric.api import *  # noqa


env.hosts = [
    '104.131.30.135',
]
env.user = "root"
env.directory = "/home/django/freemusic.ninja/django"


def deploy():
    with cd(env.directory):
        run("git pull --rebase")
        sudo("pip3 install -r requirements.txt", user='django')
        sudo("python3 manage.py collectstatic --noinput", user='django')
        sudo("python3 manage.py migrate --noinput", user='django')
        run("service gunicorn restart")


def dbshell():
    with cd(env.directory):
        sudo("python3 manage.py dbshell", user='django')


def shell():
    with cd(env.directory):
        sudo("python3 manage.py shell", user='django')


def migrate():
    with cd(env.directory):
        sudo("python3 manage.py migrate", user='django')


def gunicorn_restart():
    run("service gunicorn restart")
