import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Hexagon({ size = 24, ...props }: IconProps) {
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
      <path d="M10.4857 2.4102C10.9452 2.1416 11.4678 2 12 2C12.5322 2 13.0548 2.1416 13.5143 2.4102L19.5143 5.9185C20.4344 6.4565 21 7.4424 21 8.5083L21 15.4917C21 16.5576 20.4344 17.5435 19.5143 18.0815L13.5143 21.5898C13.0548 21.8584 12.5322 22 12 22C11.4678 22 10.9452 21.8584 10.4857 21.5898L4.4857 18.0815C3.5656 17.5435 3 16.5576 3 15.4917L3 8.5083C3 7.4424 3.5656 6.4565 4.4857 5.9185L10.4857 2.4102Z" fill="none"/>
    </svg>
  )
}
