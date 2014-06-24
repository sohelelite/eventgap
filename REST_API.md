RESTful API
=========

Here is an overview of the routes we will require, what they will do, and the HTTP Verb used to access it.

Version
----

1.0

| Route   	            |      HTTP Verb    |  Description 	                            | Data Type  	        |
|:----------:	        |:-------------:	|:------:	                                |:----------:	        |
| /login 	            |  POST  	        | Authentication of users (Sign In) 	    |
| /register 	        |  POST   	        | Create a bear     	                    |User {
                                                                                        | id (integer, optional),
                                                                                        | firstName (string, optional),
                                                                                        | username (string, optional),
                                                                                        | lastName (string, optional),
                                                                                        | email (string, optional),
                                                                                        | password (string, optional),
                                                                                        | phone (string, optional),
                                                                                        | userStatus (integer, optional) = ['1-registered' or '2-active' or '3-closed']: User Status
                                                                                        | }
| /api/bears	        |  GET 	            | Get a single bear 	                    |
| /api/bears/:bear_id   |  PUT              | Update a bear with new info               |
| /api/bears/:bear_id   |  DELETE           | Delete a bear                             |