import { useForm } from "react-hook-form";
import { FormData, customResolver } from "./custom-resolver";
import { z } from "zod";
import * as v from "valibot";
import { type } from "arktype";
import { zodResolver } from "@hookform/resolvers/zod";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { arktypeResolver } from "@hookform/resolvers/arktype";

import "./styles.css";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  city: z.string().min(1),
  street: z.number({ description: "fuyc" }).min(10, { message: "fuck" }),
});

const schemav = v.object({
  name: v.pipe(v.string("wht"), v.email("无效的邮件")),
  city: v.optional(v.string(), "I'm the default!"),
  street: v.number("only string show here"),
});

const schemaA = type({
  name: "string",
  city: "'android' | 'ios'",
  "street?": "number | boolean",
});

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { city: undefined },
    mode: "onChange",
    // resolver: valibotResolver(schemav),
    // resolver: arktypeResolver(schemaA),
  });

  const onSubmit = handleSubmit((data) =>
    console.log(
      data,
      schemav
      // v.safeParse(schemav, { name: "ab@bc.ef", street: 1 })
    )
  );

  return (
    <div>
      <h1>React Hook Form optimized custom resolver</h1>
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <input {...register("name")} placeholder="(ex: John)" />
        {errors.name && <p>{errors.name.message}</p>}

        <label>City</label>
        <input {...register("city")} placeholder="(ex: New York)" />
        {errors.city && <p>{errors.city.message}</p>}

        <label>Street</label>
        <input type="number" {...register("street", { valueAsNumber: true })} />
        {errors.street && <p>{errors.street.message}</p>}

        <input type="submit" />
      </form>
    </div>
  );
}
