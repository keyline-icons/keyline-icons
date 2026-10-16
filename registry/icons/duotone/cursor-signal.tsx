import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CursorSignal({ size = 24, ...props }: IconProps) {
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
      <path d="M9.33541 11.1582C8.98387 10.053 9.99387 9.02619 11.0805 9.30369L11.186 9.33396L22.0034 12.9375C23.2819 13.3639 23.3468 15.1486 22.101 15.666L17.6723 17.5029L15.4907 22.1601C14.9281 23.3592 13.1822 23.2485 12.7797 21.9834L9.33541 11.1582Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 10C6 7.7909 7.7909 6 10 6M2 10C2 5.5817 5.5817 2 10 2"/>
    </svg>
  )
}
