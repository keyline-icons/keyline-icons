import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SearchX({ size = 24, ...props }: IconProps) {
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
      <path d="M18 10C18 14.4183 14.4183 18 10 18C5.5817 18 2 14.4183 2 10C2 5.5817 5.5817 2 10 2C14.4183 2 18 5.5817 18 10Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14.2929 14.2929L21.2929 21.2929M7.5858 7.5858L12.4142 12.4142M12.4142 7.5858L7.5858 12.4142"/>
    </svg>
  )
}
