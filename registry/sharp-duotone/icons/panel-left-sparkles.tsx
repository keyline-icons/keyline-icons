import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PanelLeftSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M20 11V22H2V4H13M8 4V22"/>
      <path d="M19.549 1.374L20.42 3.58L22.626 4.451C22.852 4.54 23 4.758 23 5C23 5.242 22.852 5.46 22.626 5.549L20.42 6.42L19.549 8.626C19.46 8.852 19.242 9 19 9C18.758 9 18.54 8.852 18.451 8.626L17.58 6.42L15.374 5.549C15.148 5.46 15 5.242 15 5C15 4.758 15.148 4.54 15.374 4.451L17.58 3.58L18.451 1.374C18.54 1.148 18.758 1 19 1C19.242 1 19.46 1.148 19.549 1.374Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M13.843 7.234L14.387 8.613L15.766 9.157C15.907 9.212 16 9.349 16 9.5C16 9.651 15.907 9.788 15.766 9.843L14.387 10.387L13.843 11.766C13.788 11.907 13.651 12 13.5 12C13.349 12 13.212 11.907 13.157 11.766L12.613 10.387L11.234 9.843C11.093 9.788 11 9.651 11 9.5C11 9.349 11.093 9.212 11.234 9.157L12.613 8.613L13.157 7.234C13.212 7.093 13.349 7 13.5 7C13.651 7 13.788 7.093 13.843 7.234Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
