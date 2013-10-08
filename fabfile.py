from __future__ import with_statement
from fabric.api import local,settings,run,cd
from fabric.contrib.console import confirm

def git_init():
	local("git init")

def git_add(file='.'):
	local("git add %s" % file )

def git_commit():
	git_add()
	local("git commit")

def git_push():
	local("git push")

def test(name='admin'):
	with settings(warn_only=True):
		result = local("./manage.py test %s" % name,capture = True) 
	if result.failed and not confirm("Test failed. Continue anyway?") :
		abort("Abortint at user request.")

def prepare_deploy():
	test()
	git_commit()
	git_push()

def deploy():
	code_dir = '/'
