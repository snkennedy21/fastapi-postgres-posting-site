import pytest
from app.calculations import add, BankAccount, Insufficientfunds


@pytest.fixture
def zero_bank_account():
  return BankAccount()

@pytest.fixture
def bank_account():
  return BankAccount(50)

@pytest.mark.parametrize("num1, num2, expected", [(1, 3, 4), (5, 5, 10), (10, 5, 15)])
def test_add(num1, num2, expected):
  total = add(num1, num2)
  assert total == expected


def test_bank_set_initial_amount(bank_account):
  assert bank_account.balance == 50

def test_bank_default_amount(zero_bank_account):
  assert zero_bank_account.balance == 0

def test_withdraw(bank_account):
  bank_account.withdraw(20)
  assert bank_account.balance == 30

def test_deposit(bank_account):
  bank_account.deposit(20)
  assert bank_account.balance == 70

def test_collect_interest(bank_account):
  bank_account.collect_interest()
  assert round(bank_account.balance, 5) == 55

@pytest.mark.parametrize("deposited, withdrew, expected", [
  (200, 100, 100),
  (400, 200, 200),
  (1000, 50, 950)
])
def test_bank_transaction(zero_bank_account, deposited, withdrew, expected):
  zero_bank_account.deposit(deposited)
  zero_bank_account.withdraw(withdrew)
  assert zero_bank_account.balance == expected


def test_insufficient_funds(bank_account):
  with pytest.raises(Insufficientfunds):
    bank_account.withdraw(200)

