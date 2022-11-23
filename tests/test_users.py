from app import schemas
import pytest
from jose import jwt
from app.config import settings



def test_create_user(client):
  res = client.post('/users/', json={"email": "test@gmail.com", "password": "password"}) # json tests for json body
  new_user = schemas.UserOut(**res.json())
  assert new_user.email == "test@gmail.com"
  assert res.status_code == 201 


def test_login_user(client, test_user):
  res = client.post('/login', data={"username": test_user["email"], "password": test_user["password"]}) # data tests for form data
  login_res = schemas.Token(**res.json())

  payload = jwt.decode(login_res.access_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
  id = payload.get("user_id")
  assert id == test_user["id"]
  assert login_res.token_type == 'bearer'
  assert res.status_code == 200


@pytest.mark.parametrize("email, password, status_code", [
  ("wrongemail@gmail.com", "password", 403),
  ("test@gmail.com", "password", 403),
  ("wrongemail@gmail.com", "wrong_password", 403),
  (None, "password", 422),
  ("test@gmail.com", None, 422),
])
def test_incorrect_login(client, test_user, email, password, status_code):
  res = client.post("/login", data={"username": email, "password": password})
  assert res.status_code == status_code