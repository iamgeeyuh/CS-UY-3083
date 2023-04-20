import pymysql.cursors
from flask import Flask, render_template, request, session, url_for, redirect
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

conn = pymysql.connect(host='localhost',
                       user='root',
                       password='',
                       db='airline',
                       charset='utf8mb4',
                       cursorclass=pymysql.cursors.DictCursor)


#Members API route
@app.route("/login", methods=['POST'])
def login():
  username = request.form['username'] #TODO: needs to be fetched in front end
  password = request.form['password'] #TODO:needs to be fetched in front end
  isCustomer = request.form['isCustomer'] #TODO:needs to be fetched in front end

  cursor = conn.cursor()

  if (isCustomer):
    query = 'SELECT * FROM Customer WHERE email = %s and password = %s' #get the username and password
  else:
    query = 'SELECT * FROM Staff WHERE username = %s and password = %s'
  cursor.execute(query, (username, password))

  data = cursor.fetchone()
  cursor.close()
  if(data):
    #creates a session for the the user
    #session is a built in
    session['username'] = username
    return {"user": True} #TODO:redirect to the home page in front end for testing
  else:
    return {"user": False}

#home page for testing
@app.route("/home", methods=['GET', 'POST'])
def home():
  return {"members": ["success"]}

if __name__== "__main__":
  app.run(debug = True)