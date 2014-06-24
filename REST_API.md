RESTful API
=========

Here is an overview of the routes we will require, what they will do, and the HTTP Verb used to access it.

User
---
| Route   	                        |      HTTP Verb    |  Description 	                            | Data Type
|:----------:	                    |:-------------:	|:------:	                                |:-----:
| /login	                        |  POST  	        | User Login 	                            |email : String
|                                   |                   |                                           |password : String
|/register                          |   POST            | User Registration                         |name : String, username : String,email: String, password: String,confirmPassword : String 

Categories
----
| Route   	                        |      HTTP Verb    |  Description 	                            |
|:----------:	                    |:-------------:	|:------:	                                |
| /api/categories	                |  GET  	        | Get All Categories 	                    |
| /api/categories 	                |  POST   	        | Create a category     	                |
| /api/categories/:category_id 	    |  GET   	        | Get a single category  	                |
| /api/categories/:category_id      |  PUT              | Update a category with new info           |


Topics
----
| Route   	                        |      HTTP Verb    |  Description 	                            |
|:----------:	                    |:-------------:	|:------:	                                |
| /api/topics	                    |  GET  	        | Get All Topics 	                        |

Organizer
---
| Route   	                        |      HTTP Verb    |  Description 	                            |
|:----------:	                    |:-------------:	|:------:	                                |
| /api/organizers	                |  GET  	        | Get All Organizer 	                    |

Events
---
| Route   	                        |      HTTP Verb    |  Description 	                            |
|:----------:	                    |:-------------:	|:------:	                                |
| /api/events	                    |  GET  	        | Get All Events 	                        |