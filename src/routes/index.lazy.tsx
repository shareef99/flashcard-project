import { createLazyFileRoute } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { decrement, increment } from "../redux/counterSlice";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const counter = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <div className="">
      <h1 className="text-red-600">Welcome Home!</h1>
      <div className="flex gap-4">
        <button onClick={() => dispatch(increment())}>Increment</button>
        <p>{counter.value}</p>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </div>
  );
}
