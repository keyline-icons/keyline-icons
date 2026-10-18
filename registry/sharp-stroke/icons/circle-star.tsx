import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleStar({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2C17.5228 2 22 6.4772 22 12ZM11.7693 7.4036C11.8082 7.3106 11.8992 7.25 12 7.25C12.1009 7.25 12.1918 7.3106 12.2307 7.4036L13.4938 10.428L16.7699 10.6895C16.8998 10.6999 17 10.8084 17 10.9387C17 11.0119 16.9679 11.0814 16.9123 11.1289L14.417 13.2576L15.1797 16.4418C15.1842 16.4608 15.1865 16.4804 15.1865 16.5C15.1865 16.6381 15.0746 16.75 14.9365 16.75C14.8907 16.75 14.8458 16.7374 14.8066 16.7136L12 15.0064L9.1934 16.7136C9.1543 16.7374 9.1093 16.75 9.0635 16.75C8.9254 16.75 8.8135 16.6381 8.8135 16.5C8.8135 16.4804 8.8158 16.4608 8.8204 16.4418L9.5831 13.2576L7.0878 11.1289C7.0321 11.0814 7 11.0119 7 10.9387C7 10.8084 7.1002 10.6999 7.2301 10.6895L10.5062 10.428L11.7693 7.4036Z" fill="none"/>
    </svg>
  )
}
