import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GitBranchCheck({ size = 24, ...props }: IconProps) {
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
      <path d="M6 22L6 9C6.1667 12 8.2 18 15 18M14.7071 5.7071L15 6L17 8L21 4L21.2929 3.7071"/>
      <path d="M8.8284 3.1716C8.1057 2.4488 7.1043 2 6 2C3.7908 2 2 3.7908 2 6C2 8.2092 3.7908 10 6 10C8.2092 10 10 8.2092 10 6C10 4.8957 9.5512 3.8943 8.8284 3.1716ZM20.8284 20.8284C21.5512 20.1057 22 19.1043 22 18C22 15.7908 20.2092 14 18 14C15.7908 14 14 15.7908 14 18C14 20.2092 15.7908 22 18 22C19.1043 22 20.1057 21.5512 20.8284 20.8284Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
