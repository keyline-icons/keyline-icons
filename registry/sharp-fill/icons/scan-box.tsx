import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ScanBox({ size = 24, ...props }: IconProps) {
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
      <path d="M3 9V3H9M15 3H21V9M21 15V21H15M9 21H3V15"/>
      <path d="M17 9.424V14.576L12 17L7 14.576V9.424L12 12L17 9.424Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M7 9.424L12 12M12 17L17 14.576V9.424L12 7L7 9.424V14.576L12 17ZM12 12L17 9.424M12 12V17"/>
    </svg>
  )
}
