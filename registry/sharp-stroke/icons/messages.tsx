import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Messages({ size = 24, ...props }: IconProps) {
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
      <path d="M18.2096 18.8812L20.5 20L20.7157 17.6765C21.5425 16.9419 22 15.9885 22 15C22 12.7909 19.7614 11 17 11C14.2386 11 12 12.7909 12 15C12 17.2091 14.2386 19 17 19C17.4078 19 17.814 18.9601 18.2096 18.8812ZM9.0587 14.0507L8.0633 13.955C7.8086 13.9305 7.5559 13.8959 7.3065 13.8515L4.1 15.25L3.798 12.3457C2.6405 11.4274 2 10.2356 2 9C2 6.2386 5.134 4 9 4C11.8401 4 14.3988 5.2258 15.4765 7.1027L15.9744 7.9699" fill="none"/>
    </svg>
  )
}
