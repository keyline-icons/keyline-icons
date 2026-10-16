import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SmartphoneNfc({ size = 24, ...props }: IconProps) {
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
      <path d="M12 3C12.5523 3 13 3.44772 13 4V20C13 20.5523 12.5523 21 12 21H2C1.44772 21 1 20.5523 1 20V4C1 3.44772 1.44772 3 2 3H12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 4L12 4L12 20L2 20ZM5 8L6 8L8 8L9 8M17.1101 7.552L17.4283 8.5C17.8069 9.6281 18 10.8101 18 12C18 13.1899 17.8069 14.3719 17.4283 15.5L17.1101 16.448M21.0091 6.5461L21.3091 7.5C21.767 8.9561 22 10.4736 22 12C22 13.5264 21.767 15.0439 21.3091 16.5L21.0091 17.4539"/>
    </svg>
  )
}
