import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PlantPot({ size = 24, ...props }: IconProps) {
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
      <path d="M18.6603 2.0014L18.5583 2.8602C18.0327 5.7587 15.5089 7.8661 12.5632 7.8661C12.3751 7.8661 12.1872 7.8574 12 7.84C12.1282 4.6823 14.6494 2.1469 17.8063 2.0008ZM5.349 3.1154C5.5362 3.098 5.7241 3.0893 5.9121 3.0893C9.181 3.0893 11.8674 5.6688 12 8.935C11.8128 8.9524 11.6249 8.9611 11.4368 8.9611C8.168 8.9611 5.4816 6.3815 5.349 3.1154ZM4 14L5 14L19 14L20 14M6.5 14L8 22L16 22L17.5 14M12 7.84L12 8.935L12 14" fill="none"/>
    </svg>
  )
}
