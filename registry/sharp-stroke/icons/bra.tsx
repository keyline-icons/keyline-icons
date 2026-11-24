import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bra({ size = 24, ...props }: IconProps) {
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
      <path d="M3.9909 11.0068C2.7372 11.9515 2 13.4302 2 15C2 17.7614 4.2386 20 7 20C9.7614 20 12 17.7614 12 15M3.9909 11.0068L12 15M3.9909 11.0068L3.9909 4L3.9909 3M12 15C12 17.7614 14.2386 20 17 20C19.7614 20 22 17.7614 22 15C22 13.4302 21.2628 11.9515 20.0091 11.0068M12 15L20.0091 11.0068M20.0091 11.0068L20.0091 4L20.0091 3" fill="none"/>
    </svg>
  )
}
