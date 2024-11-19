import clsx from 'clsx';
import React, { useEffect } from 'react';

// Thành phần Textarea linh hoạt
const FlexInput = React.forwardRef(
  (
    {
      className,
      innerClassName,
      iconLeft,
      iconRight,
      cvStyle = true,
      setCurrent,
      onChange,
      ...props
    },
    ref,
  ) => {
    useEffect(() => {
      const tx = document.querySelectorAll('textarea.autoresize');
      for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute('style', 'height:' + tx[i].scrollHeight + 'px;');
        tx[i].addEventListener('input', OnInput, false);
      }

      function OnInput() {
        this.style.height = 0; // Đặt chiều cao về auto để tính toán chiều cao mới
        this.style.height = this.scrollHeight + 'px'; // Đặt chiều cao mới dựa trên nội dung
      }
    }, []);

    return (
      <div
        className={clsx(
          'd-flex gap-1 mt-2 align-items-start z-index-1',
          className,
        )}
        style={{ backgroundColor: 'transparent' }} // Nền trong suốt
      >
        <div className="cv-text-main" style={{ color: "#17f90b" }}>
          {iconLeft || null}
        </div>
        <textarea
          className={clsx(
            'autoresize resize-none overflow-hidden w-100 border-0', // Đảm bảo không có viền
            cvStyle && 'cv-input',
            innerClassName,
          )}
          rows={1}
          style={{ backgroundColor: 'transparent' }} // Nền trong suốt
          onChange={(e) => {
            if (setCurrent) setCurrent(e.target.value);
            else onChange(e);
          }}
          ref={ref}
          {...props}
        />
        <div className="text-main">{iconRight || null}</div>
      </div>
    );
  },
);

export default FlexInput;

// Thành phần Input chỉ đọc
export const InputReadOnly = React.forwardRef(
  (
    {
      className,
      iconLeft,
      iconRight,
      innerClassName,
      textClass,
      cvStyle = true,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={clsx('d-flex gap-1 align-items-start z-index-1', className)}
        style={{ backgroundColor: 'transparent' }} // Nền trong suốt
      >
        <div className="cv-text-main">{iconLeft || null}</div>
        <input
          className={clsx(
            'resize-none overflow-hidden w-100 border-0 fs-5', // Đảm bảo không có viền
            textClass,
            innerClassName,
          )}
          readOnly
          style={{ backgroundColor: 'transparent' }} // Nền trong suốt
          ref={ref}
          {...props}
        />
        <div className="text-main">{iconRight || null}</div>
      </div>
    );
  },
);
