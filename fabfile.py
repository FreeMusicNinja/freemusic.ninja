from fabric.api import *  # noqa


env.hosts = [
    '104.131.30.135',
]
env.user = "root"
env.directory = "/home/django/freemusic.ninja/django"


def deploy():
    with cd(env.directory):
        run("git pull --rebase")
        run("pip3 install -r requirements.txt")
        run("python3 manage.py collectstatic --noinput")
        run("python3 manage.py migrate")
        run("service gunicorn restart")
