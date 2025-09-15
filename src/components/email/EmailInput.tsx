import { Input } from "../ui/input";

const EmailInput = ({
  content,
  set_content,
  placeholder,
}: {
  placeholder: string;
  content: string;
  set_content: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <div className="">
        <Input
          className="w-full border border-gray-200 py-4 px-2 rounded-lg"
          value={content}
          onChange={(e) => set_content(e.target.value)}
          type="text"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default EmailInput;
