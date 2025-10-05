import type { promptType, PromptTypes } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Dispatch, SetStateAction } from "react";

const SelectComponent = ({
  label,
  data,
  set_value,
}: {
  label: string | promptType;
  data: PromptTypes[];
    set_value: Dispatch<SetStateAction<string | promptType>>;
}) => {
  return (
    <div className="w-full">
      <p className="mb-1">{label}</p>
      <Select onValueChange={(val:promptType) => set_value(val)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={data[0].label || ""} />
        </SelectTrigger>
        <SelectContent>
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectComponent;
