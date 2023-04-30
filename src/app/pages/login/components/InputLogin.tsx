import { forwardRef } from "react";

interface IInputLoginProps {
  label: string;
  type: string;
  value: string;
  onChange: (newValue: string) => void;
  onPressEnter?: () => void;
}

export const InputLogin = forwardRef<HTMLInputElement, IInputLoginProps>((props, ref) => {
  
  return (
    <div>
      <div className="input-group">
        <label>{props.label}</label>
        <input
          type={props.type} 
          value={props.value} 
          ref={ref}
          onChange={(e) => props.onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? props.onPressEnter?.() : undefined}
        />
      </div>
    </div>
  );

});