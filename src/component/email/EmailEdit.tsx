
import EmailInput from "./EmailInput";
import { Textarea } from "../ui/textarea";

const EmailEdit = ({body_res,subject_res,to_res, set_body_res, set_subject_res, set_to_res}:{
    body_res:string,
    subject_res:string,
    to_res:string,
    set_body_res:React.Dispatch<React.SetStateAction<string>>,
    set_subject_res:React.Dispatch<React.SetStateAction<string>>,
    set_to_res:React.Dispatch<React.SetStateAction<string>>,
}) => {
    return (
        <div className="my-4 border border-gray-200 rounded-lg p-2">
            <div className="flex flex-col gap-2 mb-4">
                <div>
                    <p className="mb-1">To</p>
                    <EmailInput
                        content={to_res}
                        set_content={set_to_res}
                        placeholder="***@gmail.com"
                    />
                </div>
                <div>
                    <p className="mb-1">Subject</p>
                    <EmailInput
                        content={subject_res}
                        set_content={set_subject_res}
                        placeholder="***@gmail.com"
                    />
                </div>
                <div>
                    <p className="mb-1">Mail Body</p>
                     <Textarea
                     onChange={(e) => set_body_res(e.target.value)}
                        value={body_res}
                        placeholder=""
                        className="max-h-[200px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default EmailEdit;
