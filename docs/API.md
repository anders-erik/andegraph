# API Documentation - v0.2 (/api/v02)

### Table of Contents
- [Overview](#overview)
- [Example Data](#example-data)
- [/content](#content)
	- [POST 	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;					Content-InsertOnTable						](#post---content-insertontable)xx
	- [GET 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		Content-SelectOnUuid						](#get---content-selectonuuid)xx
	- [PUT 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		Content-UpdateWithContentObject				](#put---content-updatewithcontentobject)xx
	- [DELETE 	&nbsp;&nbsp;  									Content-DropFullOnUuid						](#delete---content-dropfullonuuid)xx
	<br><br>
	- [GET 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		Content-SelectOnTitleLikeString				](#get-content-selectontitlelikestring)xx
	- [POST 	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;					Review-InsertScheduleOnUuid					](#post-review-insertscheduleonuuid)xx
	- [GET 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		Review-SelectCurrentReview					](#get-review-selectcurrentreview)xx
- [/edge](#edge)
	- [POST 	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;					Edge-InsertUuidUuid							](#post---edge-insertuuiduuid)xx
	- [PUT 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		Edge-UpdateWithEdgeObject					](#put---edge-updatewithedgeobject)xx
	- [DELETE 	&nbsp;&nbsp;  									Edge-DeleteOnEdgeUuid						](#delete---edge-deleteonedgeuuid)xx
	- [DELETE 	&nbsp;&nbsp;  									Edge-DeleteOnNodeUuids						](#delete---edge-deleteonnodeuuids)xx
- [/contentedge](#contentedge)
	- [POST 	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		 			ContentEdge-InsertAdjacentToUuidIntoTable	](#post---contentedge-insertadjacenttouuidintotable)xx
	- [GET 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		ContentEdge-SelectChildOfUuid				](#get---contentedge)xx
	- [GET 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 		ContentEdge-SelectParentOfUuid				](#get---contentedge)xx
	- [GET 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 		ContentEdge-SelectUndirectedOfUuid			](#get---contentedge)xx
	- [GET 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 		ContentEdge-SelectAdjacentOfUuid			](#get---contentedge)xx
- [/file](#file)
	- [POST 	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;					file										](#post-file)xx
	- [GET 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		file										](#get-file)xx
	- [DELETE 	&nbsp;&nbsp; 									file										](#delete-file)xx
	- [PUT 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		file										](#put-file)xx

<br>
<br>



## Overview  

<br>

VERSION: 0.2  
LAST UPDATED: 2024-02-21


<br>
<br>


## EXAMPLE DATA
```
[CONTENT OBJECT]
"Content" :
{
	"Uuid"": "123238290",
	"Table": "Source",
	"Type": "",
	"Title": "Wikipedia - SQL",
	"TimeCreated": 1703808000,
	"TimeLastChange": 1703808000,
}

[EDGE OBJECT]
"Edge":
{
	"Uuid": 125793730561,
	"Node1Uuid": 121264848896,
	"Node2Uuid": 125793730560,
	"Directed": 1,
	"Type": "",
	"Order": 2,
	"Path": "/SQL/"
} 

[CONTENT-EDGE OBJECT]
"ContentEdge":
{
	"Content": {
		...
	},
	"Edge": {
		...
	}
}

[CONTENT-EDGE OBJECT ARRAY]
"ContentEdges":
[
	{ ... },
	{ ... },
	...
	{ ... }
]


```


<br>
<br>


# /content


<br>




### POST - Content-InsertOnTable

```
DBI:
Content-InsertOnTable


DESCRIPTION:
Post a new Content-row to specified table. 


EXAMPLE: 
/api/v02/content/Content-InsertOnTable?Table=Project


QUERY PARAMS:
{
	"Table": "Project"
}


BODY:
NONE


RESPONSE BODY:
[CONTENT OBJECT]
{
	...
}


```

<br>
<br>

### GET - Content-SelectOnUuid

```
DBI:
Content-SelectOnUuid


DESCRIPTION:
Select and return the content row matching the provided Uuid. 


EXAMPLE: 
/api/v02/content/Content-SelectOnUuid?Uuid=372


QUERY PARAMS:
{
	"Uuid": "372"
}


BODY:
NONE


RESPONSE BODY:
[CONTENT OBJECT]
{
	...
}


```

<br>
<br>

### PUT - Content-UpdateWithContentObject

```

DBI:
Content-UpdateWithContentObject


DESCRIPTION:
Object in request body will replace content row in database on matching Uuid.


EXAMPLE: 
/api/v02/content/Content-UpdateWithContentObject


QUERY PARAMS:
{}


BODY:
[CONTENT OBJECT]
{
	...
}


RESPONSE BODY:
NONE
```

<br>
<br>

### DELETE - Content-DropFullOnUuid

```

DBI:
Content-DropFullOnUuid


DESCRIPTION:
On successful DELETE, Content object will be removed from database, along with ANY edge connected to it. 


EXAMPLE: 
/api/v02/content/Content-DropFullOnUuid?Uuid=372


QUERY PARAMS:
{
	"Uuid": "372"
}


BODY:
NONE


RESPONSE BODY:
NONE

```

<br>
<br>
<br>




### GET Content-SelectOnTitleLikeString

```

DBI:
Content-SelectOnTitleLikeString


DESCRIPTION:
Returns all content-objects with a title-substring matching the provided 'searchString'. Case is ignored. 
'includeTable' is a comma-seperated list of 'Table' names for querying specific tables. If the list is empty or missing, then all tables will be queries. 
Table limit restricts to maximum number of results per table to the specified value.

EXAMPLE: 
/api/v02/content/Content-SelectOnTitleLikeString?searchString=java&tableLimit=50&includeTable=[Project,Source]


QUERY PARAMS:
{
	"searchString": "java",
	"tableLimit": "50",
	"includeTable": "Project, Source",				// Will only query listed tables. If list is non-empty, the 'exclude'-list is ignored.
	"orderColumn": "Uuid",							// Name of column to order by. Required to be part of Node interface column.
	"desc": "0"										// Default is 0 (i.e. ascending)
}	


BODY:
NONE


RESPONSE BODY:
[CONTENT OBJECT ARRAY]
[
	{
		...
	},
	...
	{
		...
	}
]

```

### POST Review-InsertScheduleOnUuid

```

DBI:
Review_InsertScheduleOnUuid


DESCRIPTION:
Currently generates only one default schedule for the content-row with matching Uuid. 
Returns the Review-objects with the associated edges. 
Schdule: 7 reviews over the next 60 days (including a first review tomorrow), each seperated by 10 days. This is then followed by an additional 8 reviews over the next 10 years (with gradually increased between each successive review).


EXAMPLE: 
/api/v02/content/Review-InsertScheduleOnUuid?Uuid=372&ScheduleType=


QUERY PARAMS:
{
	"Uuid": "372",
	"ScheduleType": ""		// not yet implemented. Only one schedule available. 
}


BODY:
NONE


RESPONSE BODY:
[CONTENT-EDGE OBJECT ARRAY]
[
	{ 	// ONLY REVIEW-CONTENT OBJECTS
		"Content": {
			...
		},
		"Edge": {
			...
		}
	},

	...

	{	// ONLY REVIEW-CONTENT OBJECTS
		"Content": {
			...
		},
		"Edge": {
			...
		}
	}
]

```


<br>
<br>

### GET Review-SelectCurrentReview

```

DBI:
Review-SelectCurrentReview


DESCRIPTION:
Returns all uncompleted review-objects with ReviewDates less than or equal to todays date. 


EXAMPLE: 
/api/v02/content/Review-SelectCurrentReview


QUERY PARAMS:
{}


BODY:
NONE


RESPONSE BODY:
[CONTENT OBJECT ARRAY]
[
	{
		...
	},
	...
	{
		...
	}
]


```





<br>
<br>
<br>


# /edge


<br>
<br>

### POST - Edge-InsertUuidUuid

```

DBI:
Edge-InsertUuidUuid


DESCRIPTION:
Will create a new edge in database, connecting two content-objects identified with the Node1Uuid and Node2Uuid query parameters. All fields can be specified except the Uuid of the edje-object itself, which will be assigned on creation in backend. 
The new, now complete, edge will be returned.


EXAMPLE: 
/api/v02/edge/Content-InsertUuidUuid?Node1Uuid=372&Node2Uuid=251&Directed=0&Order=2&Path=/apis/jsfetch


QUERY PARAMS:
{
	"Node1Uuid": "372",
	"Node2Uuid": "251",
	"Directed": "0",
	"Type": "", 			// optional. default = ""
	"Order": "2", 			// optional. default = 0 
	"Path": "/apis/jsfetch"	// optional. default = "/"
}


BODY:
NONE


RESPONSE BODY:
[EDGE OBJECT]
{
	...
}

```

<br>
<br>


### PUT - Edge-UpdateWithEdgeObject

```

DBI:
Edge-UpdateWithEdgeObject


DESCRIPTION:
The edge-object present in the request body will replace the matching edge-row in the database. The returned edge-object is grabbed from the database AFTER UPDATE query is completed.  


EXAMPLE: 
/api/v02/edge/Edge-UpdateWithEdgeObject


QUERY PARAMS:
{}


BODY:
[EDGE OBJECT]
{
	...
}


RESPONSE BODY:
[EDGE OBJECT]
{
	...
}

```

<br>
<br>

### DELETE - Edge-DeleteOnEdgeUuid

```

DBI:
Edge-DeleteOnEdgeUuid


DESCRIPTION:
The edge object in the database with a Uuid matching the provided query value will be permanently deleted.
Content rows will NOT be directly altered, but the operation could potentially result in nodes with degree zero!


EXAMPLE: 
/api/v02/edge/Edge-DeleteOnEdgeUuid?Uuid=500


QUERY PARAMS:
{}


BODY:
NONE


RESPONSE BODY:
NONE

```

<br>
<br>

### DELETE - Edge-DeleteOnNodeUuids
```
DBI:
Edge-DeleteOnNodeUuids


DESCRIPTION:
All edge-objects in the database with a matching Node-Uuid pair will be permanently deleted.
Content rows will NOT be directly altered, but the operation could potentially result in nodes with degree zero!


EXAMPLE: 
/api/v02/edge/Edge-DeleteOnNodeUuids?Uuid1=501&Uuid2=502


QUERY PARAMS:
{
	"Uuid1": "501",
	"Uuid2": "502"
}


BODY:
NONE


RESPONSE BODY:
NONE

```

<br>
<br>
<br>







# /contentedge

<br>
<br>

### POST - ContentEdge-InsertAdjacentToUuidIntoTable

```

DBI:
/ContentEdge-InsertAdjacentToUuidIntoTable


DESCRIPTION:
Post a new Content-row in specified table, and creating an edge connecting it to the specified Uuid-row, with directedness defaulting to 0 if not specified. 


EXAMPLE: 
/api/v02/contentedge/ContentEdge-InsertAdjacentToUuidIntoTable?Uuid=251&Directed=0&Table=Source&Type=&Order=&Path=


QUERY PARAMS:
{
	"Uuid": "251",
	"Directed": "0", // optional. default=0.
	"Table": "Source",
	"Type": "", 			// optional. default = ""
	"Order": "2", 			// optional. default = 0 
	"Path": "/apis/jsfetch"	// optional. default = "/"
}


BODY:
NONE


RESPONSE BODY:
[CONTENT-EDGE OBJECT]
{
	"Content": {
		...
	},
	"Edge": {
		...
	}
}



```

<br><br>


### GET - ContentEdge

```
DBI:
/ContentEdge-SelectChildOfUuid
/ContentEdge-SelectParentOfUuid
/ContentEdge-SelectUndirectedOfUuid
/ContentEdge-SelectAdjacentOfUuid


DESCRIPTION:
Will fetch all matching ContentEdge-objects matching the relatedness (child, parent, undirected, adjacent) for the given Uuid. 


EXAMPLE: 
/api/v02/contentedge/ContentEdge-SelectChildOfUuid?Uuid=251


QUERY PARAMS:
{
	"Uuid": "251"
}


BODY:
NONE


RESPONSE BODY:
[CONTENT-EDGE OBJECT ARRAY]
[
	{
		"Content": {
			...
		},
		"Edge": {
			...
		}
	},

	...

	{
		"Content": {
			...
		},
		"Edge": {
			...
		}
	}
]


```

<br>
<br>
<br>










# /file


<br>

NOTE: The '/file' api route will handle the files for already created 'file'-nodes in the main app-graph. Attempting to POST a file without first creating and passing an appropriate node-Uuid will result in an error!

NOTE 2: The Bruno API environment did not allow me to simply put arbitrary binary files in the request body. The tests for POST and PUT are therefore done using cURL and the files can be found in a separate folder. (/test/api/postfile)

<br>




### POST file

```

/file/<Uuid>


DESCRIPTION:
Post a new file to a file-node who does not already have a file associated with it. If a file exist, then a PUT request has to be sent instead. 
The returned file is read from the backend file system after write.



EXAMPLE: 
/api/v02/file/1001?Type=image&Title=puppies&Extension=png&IAmAuthor=1


QUERY PARAMS:
{
	"Type": "image", 		
	"Title": "puppies", 
	"Extension": "png",
	"IAmAuthor": "1"		// optional. default=0.
}


BODY:
[FILEDATA]


RESPONSE BODY:
[FILEDATA]

```

<br>
<br>




### GET file

```

/file/<Uuid>


DESCRIPTION:
Fetch the file associated with the file-node Uuid. 


EXAMPLE: 
/api/v02/file/1001


QUERY PARAMS:
{}


BODY:
NONE


RESPONSE BODY:
NONE

```

<br>
<br>




### PUT file

```

/file/<Uuid>


DESCRIPTION:
PUT a new file to a file-node with an already existing file. 
The returned file is read from the backend file system after write.
This endpoint is identical to POST. The only difference is that PUT will ONLY overwrite existing files. Attempting to create a new file will return an error, imploring user to POST instead.



EXAMPLE: 
/api/v02/file/1001?Type=image&Title=puppies2&Extension=png&IAmAuthor=1


QUERY PARAMS:
{
	"Type": "image", 		
	"Title": "puppies2", 
	"Extension": "png",
	"IAmAuthor": "1"		// optional. default=0.
}


BODY:
[FILEDATA]


RESPONSE BODY:
[FILEDATA]

```

<br>
<br>



### DELETE file

```

/file/<Uuid>


DESCRIPTION:
Deletes the file associated with the file-node Uuid. 
This will not delete the file-node.


EXAMPLE: 
/api/v02/file/1001


QUERY PARAMS:
{}


BODY:
NONE


RESPONSE BODY:
NONE
```



<br>
<br>