import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DropletOff({ size = 24, ...props }: IconProps) {
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
      <path d="M9.4815 4.0247L10.4 2.8C10.7777 2.2965 11.3703 2 12 2C12.6297 2 13.2223 2.2965 13.5999 2.7999L18.4 9.2C19.2768 10.369 19.8167 11.756 19.9609 13.2103C20.0536 14.1451 18.9229 14.6803 18.2587 14.0161L9.5744 5.3318C9.2225 4.9799 9.1829 4.4228 9.4815 4.0247ZM18.5678 18.5678C17.0723 20.718 14.6191 22 12 22C7.5817 22 4 18.4183 4 14C4 12.269 4.5614 10.5847 5.6 9.2L7.1429 7.1429Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 2L22 22" fill="none"/>
    </svg>
  )
}
