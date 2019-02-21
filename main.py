from flask import Flask, request, redirect, render_template, session, flash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://blogz:beproductive@localhost:8889/blogz'
app.config['SQLALCHEMY_ECHO'] = True
db = SQLAlchemy(app)
app.secret_key = 'y337kGcys&zP3B'


class Blog(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(60))
    body = db.Column(db.String(600))
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, title, body, owner):
        self.title = title
        self.body = body
        self.owner = owner

class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(120))
    blogs = db.relationship('Blog', backref='owner')

    def __init__(self, email, password):
        self.email = email
        self.password = password

@app.before_request
def require_login():
    allowed_routes = ['login', 'register']
    if request.endpoint not in allowed_routes and 'email' not in session:
        return redirect('/login')

@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        if user and user.password == password:
            session['email'] = email
            flash("Logged in")
            return redirect('/')
        else:
            flash('User password incorrect, or user does not exist', 'error')

    return render_template('login.html')

@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        verify = request.form['verify']

        # TODO - validate user's data

        existing_user = User.query.filter_by(email=email).first()
        if not existing_user and password == verify:
            new_user = User(email, password)
            db.session.add(new_user)
            db.session.commit()
            session['email'] = email
            return redirect('/')
        else:
            # TODO - user better response messaging
            return render_template('register.html', problem = 'user already exists or passwords did not match')

    return render_template('register.html')

@app.route('/logout')
def logout():
    del session['email']
    return redirect('/')


@app.route('/', methods=['POST', 'GET'])
def index():

    owner = User.query.filter_by(email=session['email']).first()


    if request.method == 'POST':
        titlee = ''
        bloge = ''
        title_name = request.form['title']
        blog_body = request.form['blog']
        if title_name == '' or blog_body == '':
            if title_name == '':
                titlee = 'Error: the blog title was left empty'
            if blog_body == '':
                bloge = 'Error: the blog was left empty'
            return render_template('blog.html', title='Build a  blog', body = blog_body, titlee=titlee, bloge=bloge, btitle=title_name )
        else:
            new_blogb = Blog(title_name, blog_body, owner)
            db.session.add(new_blogb)
            db.session.commit()
            blogs = Blog.query.all()
            return redirect('/blog?id={0}'.format(new_blogb.id))
    else:
        return render_template('blog.html')

@app.route('/blogs')
def display_blogs():
    blogs = Blog.query.all()
    return render_template('main.html', title = "blogs page", blogs = blogs)

@app.route('/blog')
def display_blog():
    blog_id = request.args.get('id')
    blog = Blog.query.get(blog_id)
    return render_template('individual.html', title = "blog page", blog = blog)


@app.route('/delete-task', methods=['POST'])
def delete_task():

    blog_id = int(request.form['blog-id'])
    blog = Blog.query.get(blog_id)
    db.session.delete(blog)
    db.session.commit()

    return redirect('/blogs')

@app.route('/home')
def home():
    users = User.query.all()
    return render_template('usernames.html', users=users)

@app.route('/userblog')
def userblog():
    user = request.args.get('owner')
    blogs = Blog.query.filter_by(id=user).all()
    return render_template('userblog.html', blogs = blogs)



if __name__ == '__main__':
    app.run()