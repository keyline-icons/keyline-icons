import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LampCeiling({ size = 24, ...props }: IconProps) {
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
      <path d="M8 2H16M12 2V10M8 18C8 20.2091 9.791 22 12 22C14.209 22 16 20.2091 16 18" strokeOpacity="0.4"/>
      <path d="M12 19H4.001C3.448 19 3.001 18.5523 3.001 18C3.001 17.8448 3.037 17.6917 3.106 17.5528L7.106 9.5528C7.275 9.214 7.621 9 8 9H16C16.379 9 16.725 9.214 16.894 9.5528L20.894 17.5528C20.963 17.6917 20.999 17.8448 20.999 18C20.999 18.5523 20.552 19 19.999 19H12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
