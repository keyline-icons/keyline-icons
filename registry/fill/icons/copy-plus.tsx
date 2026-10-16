import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CopyPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M15.8284 4C15.4046 2.8015 14.2714 2 13 2H5C3.34315 2 2 3.34315 2 5V13C2 14.2714 2.8015 15.4046 4 15.8284"/>
      <path d="M11 7L19 7C21.20914 7 23 8.79086 23 11L23 19C23 21.20914 21.20914 23 19 23L11 23C8.79086 23 7 21.20914 7 19L7 11C7 8.79086 8.79086 7 11 7ZM14 14L14 12C14 11.44772 14.44772 11 15 11C15.55228 11 16 11.44772 16 12L16 14L18 14C18.55228 14 19 14.44772 19 15C19 15.55228 18.55228 16 18 16L16 16L16 18C16 18.55228 15.55228 19 15 19C14.44772 19 14 18.55228 14 18L14 16L12 16C11.44772 16 11 15.55228 11 15C11 14.44772 11.44772 14 12 14Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
