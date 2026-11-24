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
      <path d="M12 18.3178C10.9251 19.9345 9.087 21 7 21C3.6863 21 1 18.3137 1 15C1 13.1163 1.8846 11.3418 3.3891 10.2082C3.5625 10.0775 3.7738 10.0068 3.9909 10.0068C4.1458 10.0068 4.2985 10.0428 4.4371 10.1119L8.4416 12.1085L12 13.8826L15.5584 12.1085L19.5629 10.1119C19.7015 10.0428 19.8542 10.0068 20.0091 10.0068C20.2262 10.0068 20.4375 10.0775 20.6109 10.2082C22.1154 11.3418 23 13.1163 23 15C23 18.3137 20.3137 21 17 21C14.913 21 13.0749 19.9345 12 18.3178Z" fill="currentColor" stroke="none"/>
      <path d="M3.9909 11.0068L3.9909 3M20.0091 11.0068L20.0091 3"/>
    </svg>
  )
}
