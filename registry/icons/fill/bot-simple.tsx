import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BotSimple({ size = 24, ...props }: IconProps) {
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
      <path d="M3 12C3 9.2386 5.2386 7 8 7L16 7C18.7614 7 21 9.2386 21 12L21 17C21 19.7614 18.7614 22 16 22L8 22C5.2386 22 3 19.7614 3 17L3 12ZM10.5 14.5C10.5 13.6716 9.8284 13 9 13C8.1716 13 7.5 13.6716 7.5 14.5C7.5 15.3284 8.1716 16 9 16C9.8284 16 10.5 15.3284 10.5 14.5ZM16.5 14.5C16.5 13.6716 15.8284 13 15 13C14.1716 13 13.5 13.6716 13.5 14.5C13.5 15.3284 14.1716 16 15 16C15.8284 16 16.5 15.3284 16.5 14.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 8L12 3.5" fill="none"/>
      <path d="M13.5 3.5C13.5 4.3284 12.8284 5 12 5C11.1716 5 10.5 4.3284 10.5 3.5C10.5 2.6716 11.1716 2 12 2C12.8284 2 13.5 2.6716 13.5 3.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
