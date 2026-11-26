import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BotFrown({ size = 24, ...props }: IconProps) {
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
      <path d="M12 7H20C20.552 7 21 7.448 21 8V21C21 21.552 20.552 22 20 22H4C3.448 22 3 21.552 3 21V8C3 7.448 3.448 7 4 7H12ZM8 16.586L9.414 18L9.707 17.707C9.928 17.486 10.142 17.3 10.35 17.144C10.558 16.988 10.757 16.865 10.947 16.769C11.137 16.674 11.319 16.607 11.493 16.564C11.666 16.521 11.834 16.5 12 16.5C12.166 16.5 12.334 16.521 12.507 16.564C12.681 16.607 12.863 16.674 13.053 16.769C13.243 16.865 13.442 16.988 13.65 17.144C13.858 17.3 14.072 17.486 14.293 17.707L14.586 18L16 16.586L15.707 16.293C15.428 16.014 15.142 15.763 14.85 15.544C14.558 15.324 14.257 15.135 13.947 14.981C13.637 14.826 13.319 14.705 12.993 14.624C12.666 14.542 12.334 14.5 12 14.5C11.666 14.5 11.334 14.542 11.007 14.624C10.681 14.705 10.363 14.826 10.053 14.981C9.743 15.135 9.442 15.324 9.15 15.544C8.858 15.763 8.572 16.014 8.293 16.293L8 16.586ZM10 12C10 11.448 9.552 11 9 11C8.448 11 8 11.448 8 12C8 12.552 8.448 13 9 13C9.552 13 10 12.552 10 12ZM16 12C16 11.448 15.552 11 15 11C14.448 11 14 11.448 14 12C14 12.552 14.448 13 15 13C15.552 13 16 12.552 16 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 8V3.5M1 14.5H4M23 14.5H20"/>
      <path d="M13.5 3.5C13.5 4.328 12.828 5 12 5C11.172 5 10.5 4.328 10.5 3.5C10.5 2.672 11.172 2 12 2C12.828 2 13.5 2.672 13.5 3.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
