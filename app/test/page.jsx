'use client';
import { useOptimistic, useState, useRef } from "react";

export default function App() {
  const formRef = useRef();

  const [counter, setCounter] = useState(0);
  const [optimisticCounter, addOptimisticCounter] = useOptimistic(
    counter,
    (state, newCounter) => +state + (+newCounter)
  );

  async function sendMessage(formData) {
    const newVal = Number(await deliverMessage(formData.get("counter")));
    setCounter(val => val + newVal);
  }

  async function formAction(formData) {
    addOptimisticCounter(formData.get("counter"));
    formRef.current.reset();
    await sendMessage(formData);
  }

  return (
    <>
      {optimisticCounter}
      <form action={formAction} ref={formRef}>
        <input type="number" name="counter" placeholder="Number" />
        <button type="submit">Add number</button>
      </form>
    </>
  );
}

export async function deliverMessage(message) {
  await new Promise((res) => setTimeout(res, 1000));
  return message;
}
