import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TriangleAlert({ size = 24, ...props }: IconProps) {
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
      <path d="M8.73282 3.88688C10.2061 1.37155 13.7947 1.37151 15.268 3.88688L22.4623 16.172C23.9502 18.7134 22.1759 21.9998 19.1947 22.0002H4.80607C1.82451 22.0001 0.0501869 18.7136 1.53849 16.172L8.73282 3.88688Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 9V13"/>
      <path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
