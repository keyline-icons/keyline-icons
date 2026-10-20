import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pyramid({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M1.1702 16.311L11.1702 1.4419C11.356 1.1657 11.6671 1 12 1C12.3329 1 12.644 1.1657 12.8298 1.4419L22.8298 16.311C22.9408 16.476 23 16.6703 23 16.8691C23 17.2441 22.7902 17.5876 22.4565 17.7588L12.4565 22.8897C12.3152 22.9622 12.1588 23 12 23C11.8412 23 11.6848 22.9622 11.5435 22.8897L1.5435 17.7588C1.2098 17.5876 1 17.2441 1 16.8691C1 16.6703 1.0592 16.476 1.1702 16.311Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M11 1.695L11.1702 1.4419C11.356 1.1657 11.6671 1 12 1C12.3329 1 12.644 1.1657 12.8298 1.4419L22.8298 16.311C22.9408 16.476 23 16.6703 23 16.8691C23 17.2441 22.7902 17.5876 22.4565 17.7588L12.4565 22.8897C12.3152 22.9622 12.1588 23 12 23C11.8412 23 11.6848 22.9622 11.5435 22.8897L11 22.6108L11 1.695Z" fill="currentColor"/>
    </svg>
  )
}
