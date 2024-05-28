import '@testing-library/jest-dom';

import userEvent from "@testing-library/user-event";
import {screen} from "@testing-library/angular";

import {errorMessages} from "../shared/dictionary/error-message/errorMessage";

const user = userEvent.setup();

export const checkRequiredInput = async (dataTestId: string, text = 'test') => {
  let input = screen.getByTestId(dataTestId);
  await user.type(input, text);

  input = screen.getByTestId(dataTestId);
  await user.clear(input);

  expect(screen.getByText(errorMessages.required)).toBeVisible();
}

export const checkRangeLengthInput = async (dataTestId: string, range: { min: number, max: number }, text = 'test') => {
  let input = screen.getByTestId(dataTestId);
  await user.type(input, text);
  expect(screen.getByText(errorMessages.stringRangeLength(range.min, range.max))).toBeVisible();
}

export const checkOnlyNumbers = async (dataTestId: string, text: string) => {
  let input = screen.getByTestId(dataTestId);
  await user.type(input, text);
  expect(screen.getByText(errorMessages.isNumber)).toBeVisible();
}

export const checkSpecialCharacters = async (dataTestId: string, text: string) => {
  let input = screen.getByTestId(dataTestId);
  await user.type(input, text);
  expect(screen.getByText(errorMessages.specialCharacter)).toBeVisible();
}

export const checkMinLength = async (dataTestId: string, length: number, text: string) => {
  let input = screen.getByTestId(dataTestId);
  await user.type(input, text);
  expect(screen.getByText(errorMessages.minlength(length))).toBeVisible();
}

export const checkOnlyLetter = async (dataTestId: string, text: string) => {
  let input = screen.getByTestId(dataTestId);
  await user.type(input, text);
  expect(screen.getByText(errorMessages.onlyLetter)).toBeVisible();
}
