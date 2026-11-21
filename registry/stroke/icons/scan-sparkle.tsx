import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ScanSparkle({ size = 24, ...props }: IconProps) {
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
      <path d="M12.691 6.45556L13.91 9.30017C14.0622 9.65515 14.3449 9.93781 14.6998 10.09L17.5444 11.309C18.1519 11.5694 18.1519 12.4306 17.5444 12.691L14.6998 13.91C14.3449 14.0622 14.0622 14.3449 13.91 14.6998L12.691 17.5444C12.4306 18.1519 11.5694 18.1519 11.309 17.5444L10.09 14.6998C9.93781 14.3449 9.65515 14.0622 9.30017 13.91L6.45556 12.691C5.84815 12.4306 5.84815 11.5694 6.45556 11.309L9.30017 10.09C9.65515 9.93781 9.93781 9.65515 10.09 9.30017L11.309 6.45556C11.5694 5.84815 12.4306 5.84815 12.691 6.45556ZM3 8V6C3 4.3431 4.3431 3 6 3H8M16 3H18C19.6569 3 21 4.3431 21 6V8M21 16V18C21 19.6569 19.6569 21 18 21H16M8 21H6C4.3431 21 3 19.6569 3 18V16" fill="none"/>
    </svg>
  )
}
