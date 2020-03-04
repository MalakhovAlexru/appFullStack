# appFullStack
Node.js side of fullStack app (Node, Mongoose, Mongo, React (in future ))

## Деплой на [Heroku](https://hidden-sierra-16598.herokuapp.com/)

Описание применения: 

### /api/auth/signup
	POST: as parameter email и password (реализована базовая валидация введенных данных, также, валидация что в БД такого пользователя нет)
Пример использования:  
  {
    "email":"test@mail.org",
    "password": "123456"
  }
 ___
### /api/auth/login

	POST: as params email и password
  Пример использования:  
  {
    "email":"test@mail.org",
    "password": "123456"
  }
 ___
### /api/auth/logout
	POST: user.id (выход из системы происходит по уникальному Id сгенерированному MongoDB (как пример использования), дополнительно происходит затирание токена доступа)
Пример использования (Id можно получить при входе в систему): 
{
	"userId": "5e5ee042343a821a3c0c4151"
}
___
### /api/auth/user

	GET: returns userObject
  
 ___
 ### /api/order
 POST пример:

{
	"Id": 1234,
      "serviceName": "back",
      "targetUrl": "www.google.com",
      "Price": 50,
      "serviceActions": {
      	"actionName": "recipeOrder",
      "Count": 33
      }
}

	POST: as params orderObject
	GET: returns array orderObject
  ___
