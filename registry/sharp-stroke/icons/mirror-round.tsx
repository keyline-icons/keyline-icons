import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MirrorRound({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2C14.7614 2 17 4.6863 17 8C17 11.3137 14.7614 14 12 14C9.2386 14 7 11.3137 7 8C7 4.6863 9.2386 2 12 2ZM21 8C21 13.5228 16.9706 18 12 18C7.0294 18 3 13.5228 3 8M23 8L17 8M1 8L7 8M12 18L12 22M8 22L16 22" fill="none"/>
    </svg>
  )
}
