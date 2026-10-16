import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlarmClockCheck({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 4C16.9706 4 21 8.0294 21 13C21 17.9706 16.9706 22 12 22C7.0294 22 3 17.9706 3 13C3 8.0294 7.0294 4 12 4ZM8.4546 14.2628L10.6543 16.5255C10.8426 16.7191 11.1012 16.8284 11.3713 16.8284C11.7197 16.8284 12.0429 16.6471 12.2246 16.3499L15.6817 10.6931C15.7776 10.5361 15.8284 10.3556 15.8284 10.1716C15.8284 9.6193 15.3807 9.1716 14.8284 9.1716C14.48 9.1716 14.1568 9.3529 13.9751 9.6501L11.1901 14.2073L9.8886 12.8687C9.7003 12.675 9.4417 12.5657 9.1716 12.5657C8.6193 12.5657 8.1716 13.0134 8.1716 13.5657C8.1716 13.8261 8.2731 14.0761 8.4546 14.2628Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M3 5.0627C4.1606 3.7467 5.5957 2.7013 7.2042 2M21 5.0627C19.8394 3.7467 18.4043 2.7013 16.7958 2M8 19.9282L6.8038 22M16 19.9282L17.1962 22"/>
    </svg>
  )
}
