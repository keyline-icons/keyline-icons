import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleStar({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12ZM10.8372 6.7914L9.8109 9.3939L7.1447 9.6193C6.4974 9.6738 5.9997 10.2151 5.9997 10.8647C5.9997 11.2183 6.1495 11.5554 6.412 11.7924L8.4904 13.6701L7.8562 16.4742C7.8358 16.5647 7.8254 16.6573 7.8254 16.7501C7.8254 17.4404 8.385 18 9.0754 18C9.3155 18 9.5505 17.9309 9.7524 17.8008L12 16.3529L14.2476 17.8008C14.4495 17.9309 14.6845 18 14.9246 18C15.615 18 16.1746 17.4404 16.1746 16.7501C16.1746 16.6573 16.1642 16.5647 16.1438 16.4742L15.5096 13.6701L17.588 11.7924C17.8505 11.5554 18.0003 11.2183 18.0003 10.8647C18.0003 10.2151 17.5026 9.6738 16.8553 9.6193L14.1891 9.3939L13.1628 6.7914C12.9745 6.3139 12.5134 6 12 6C11.4866 6 11.0255 6.3139 10.8372 6.7914Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
