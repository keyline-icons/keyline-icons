import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cap({ size = 24, ...props }: IconProps) {
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
      <path d="M2 15V19.5C2 20.3285 2.6716 21 3.5 21C3.7244 21 3.9459 20.9497 4.1483 20.8527C6.5991 19.6781 9.2822 19.0683 12 19.0683C14.7178 19.0683 17.4009 19.6781 19.8517 20.8527C20.0541 20.9497 20.2756 21 20.5 21C21.3284 21 22 20.3285 22 19.5V15M2 15V12C2 7.0294 6.4772 3 12 3M2 15C5.1686 13.6797 8.5673 13 12 13M12 3C17.5228 3 22 7.0294 22 12V15M12 3V13M22 15C18.8314 13.6797 15.4327 13 12 13" fill="none"/>
    </svg>
  )
}
