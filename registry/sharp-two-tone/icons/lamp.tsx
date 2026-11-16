import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Lamp({ size = 24, ...props }: IconProps) {
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
      <path d="M16 1C16.379 1 16.725 1.214 16.895 1.553L20.895 9.553C21.049 9.863 21.033 10.231 20.851 10.525C20.668 10.82 20.347 11 20 11H15C15 11.048 15.009 11.14 15.2 11.345C15.42 11.58 15.701 11.785 16.133 12.138C16.912 12.774 18 13.761 18 15.5C18 17.26 17.399 18.469 16.798 19.484C16.457 20.059 16.155 20.528 15.916 21H21V23H3V21H8.084C7.845 20.528 7.543 20.059 7.202 19.484C6.601 18.469 6 17.26 6 15.5C6 13.761 7.088 12.774 7.867 12.138C8.299 11.785 8.58 11.58 8.8 11.345C8.991 11.14 9 11.048 9 11H4C3.653 11 3.332 10.82 3.149 10.525C2.967 10.231 2.951 9.863 3.105 9.553L7.105 1.553L7.177 1.432C7.362 1.164 7.669 1 8 1H16Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14 10V11C14 12.6 17 13 17 15.5C17 18.5 15 19.6 14.5 22M10 10V11C10 12.6 7 13 7 15.5C7 18.5 9 19.6 9.5 22M3 22H21M8 2H16L20 10H4L8 2Z"/>
    </svg>
  )
}
