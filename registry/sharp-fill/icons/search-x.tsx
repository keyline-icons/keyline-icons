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
      <path d="M18 10C18 14.4183 14.4183 18 10 18C5.5817 18 2 14.4183 2 10C2 5.5817 5.5817 2 10 2C14.4183 2 18 5.5817 18 10ZM11.4142 10L13.1213 11.7071L11.7071 13.1213L10 11.4142L8.2929 13.1213L6.8787 11.7071L8.5858 10L6.8787 8.2929L8.2929 6.8787L10 8.5858L11.7071 6.8787L13.1213 8.2929L11.4142 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M14.2929 14.2929L21.2929 21.2929"/>
    </svg>
  )
}
