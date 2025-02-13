import { Resolver, FieldError } from "react-hook-form";
import get from "lodash/get";

export interface FormData {
  name: string;
  city: string;
  street: string;
}

function validateLength(
  name: string,
  value: any,
  errors: Record<string, FieldError>
) {
  // Perform a custom validation depending on field name
  const minLength = name === "street" ? 6 : 3;

  if (!value || value.length < minLength) {
    return {
      ...errors,
      [name]: {
        type: `min-length-${minLength}`,
        message: `The field "${name}" must be at least ${minLength} chars`
      }
    };
  }

  return errors;
}

export const customResolver: Resolver<FormData> = (
  values,
  _context,
  { names }
) => {
  let errors = {};
  if (names) {
    // Validate only changed fields
    errors = names.reduce((acc, name) => {
      const value = get(values, name);

      return validateLength(name, value, acc);
    }, {});
  } else {
    // Validate all fields on submit event
    errors = Object.entries(values).reduce(
      (acc, [name, value]) => validateLength(name, value, acc),
      {}
    );
  }

  return { values, errors };
};
